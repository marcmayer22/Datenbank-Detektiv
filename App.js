import React, { useState } from "react";

export default function DatenbankDetektive() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [fall, setFall] = useState("fall1");

  const fakeData = {
    zeugen: [
      { id: 1, name: "Max Müller", tatort: "Hauptstraße 5", zeit: "20:30" },
      { id: 2, name: "Lena Schulz", tatort: "Hauptstraße 5", zeit: "21:00" },
      { id: 3, name: "Tom Becker", tatort: "Parkallee", zeit: "20:45" },
      { id: 4, name: "Sami Yilmaz", tatort: "Bahnhof", zeit: "18:00" },
    ],
    alibis: [
      { person: "Lena Schulz", status: "bestätigt" },
      { person: "Tom Becker", status: "bestätigt" },
      { person: "Sami Yilmaz", status: "bestätigt" },
    ],
    telefonate: [
      { von: "Max Müller", an: "Unbekannt", uhrzeit: "20:15" },
      { von: "Sami Yilmaz", an: "Tom Becker", uhrzeit: "19:50" },
    ],
  };

  const handleRunQuery = () => {
    if (fall === "fall1" && query.includes("personen ohne Alibi")) {
      const zeugenOhneAlibi = fakeData.zeugen.filter(
        (z) => !fakeData.alibis.find((a) => a.person === z.name)
      );
      setResult(zeugenOhneAlibi);
    } else if (fall === "fall2" && query.includes("telefoniert")) {
      const telefoniert = fakeData.telefonate.filter(
        (t) => t.von === "Max Müller"
      );
      setResult(telefoniert);
    } else {
      setResult([{ error: "Unbekannte Abfrage oder falscher Fall." }]);
    }
  };

  const faelle = {
    fall1: {
      titel: "Fall 1: Alibi-Check",
      beschreibung:
        "Ein Diebstahl ereignete sich in der Hauptstraße 5 um 20:30 Uhr. Wer war dort und hat KEIN Alibi?",
      tipp: "Versuche 'personen ohne Alibi' einzugeben.",
    },
    fall2: {
      titel: "Fall 2: Verdächtiger Anruf",
      beschreibung:
        "Ein mysteriöser Anruf ging kurz vor dem Diebstahl ein. Wer hat um 20:15 Uhr telefoniert?",
      tipp: "Versuche 'telefoniert' einzugeben, um Verbindungen zu prüfen.",
    },
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', color: '#1e3a8a' }}>🕵️ Datenbank-Detektive</h1>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setFall("fall1")} style={{ marginRight: '1rem' }}>
          Fall 1
        </button>
        <button onClick={() => setFall("fall2")}>
          Fall 2
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>{faelle[fall].titel}</h2>
        <p>{faelle[fall].beschreibung}</p>

        <textarea
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="z.B. personen ohne Alibi"
          style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
        />

        <button onClick={handleRunQuery} style={{ marginTop: '1rem' }}>
          Query ausführen
        </button>

        <p style={{ color: 'gray', fontStyle: 'italic' }}>💡 {faelle[fall].tipp}</p>

        <pre style={{ background: '#f3f4f6', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
