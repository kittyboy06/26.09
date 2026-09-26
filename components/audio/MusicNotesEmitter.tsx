"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NoteParticle {
  id: number;
  symbol: string;
  color: string;
  xOffset: number;
}

const NOTES = ["♪", "♫", "♩", "♬", "✦", "✨"];
const NOTE_COLORS = ["#7DD3FC", "#C09AF4", "#F79ABD", "#FFF8E7", "#A8E3FF"];

export function MusicNotesEmitter({ isPlaying }: { isPlaying: boolean }) {
  const [notes, setNotes] = useState<NoteParticle[]>([]);

  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    let noteId = 0;
    const interval = setInterval(() => {
      const newNote: NoteParticle = {
        id: ++noteId,
        symbol: NOTES[Math.floor(Math.random() * NOTES.length)],
        color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
        xOffset: (Math.random() - 0.5) * 16,
      };

      setNotes((prev) => [...prev.slice(-4), newNote]);
    }, 1400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const removeNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  if (!isPlaying) return null;

  return (
    <div
      className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 overflow-visible select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {notes.map((note) => (
          <motion.span
            key={note.id}
            initial={{ opacity: 0, y: 0, x: note.xOffset, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              y: -36,
              x: [note.xOffset, note.xOffset + (note.id % 2 === 0 ? 8 : -8), note.xOffset],
              scale: [0.6, 1.1, 0.9],
              rotate: [0, note.id % 2 === 0 ? 15 : -15],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.2,
              ease: "easeOut",
            }}
            onAnimationComplete={() => removeNote(note.id)}
            style={{
              position: "absolute",
              color: note.color,
              filter: `drop-shadow(0 0 5px ${note.color})`,
              fontSize: "13px",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {note.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
