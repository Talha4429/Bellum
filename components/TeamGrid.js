"use client";

import { useEffect, useState } from "react";

const teamMembers = [
  { role: "Founding Partner", introduction: "Guides Bellum's enduring commitment to thoughtful design and lasting quality.", palette: ["#C7B9A5", "#6B5544"] },
  { role: "Founding Partner", introduction: "Shapes the studio's vision through material honesty and personal client relationships.", palette: ["#AAB2A4", "#445047"] },
  { role: "Design Director", introduction: "Turns broad ideas into interiors with calm, character, and a clear point of view.", palette: ["#C6A89B", "#754F45"] },
  { role: "Architect", introduction: "Creates spaces where proportion, light, and daily life work in quiet harmony.", palette: ["#A9B6BE", "#425967"] },
  { role: "Interior Designer", introduction: "Brings texture, comfort, and refined detail to every part of the interior.", palette: ["#C7BFAE", "#625B4D"] },
  { role: "Furniture Designer", introduction: "Develops bespoke pieces that feel precise, useful, and made for a lifetime.", palette: ["#B5A58D", "#5E4D37"] },
  { role: "Project Lead", introduction: "Connects the studio, makers, and site teams to carry each vision through.", palette: ["#B5AAA2", "#5B4A42"] },
  { role: "Client Experience", introduction: "Makes every step of the Bellum journey considered, clear, and personal.", palette: ["#AAB1A4", "#4B5449"] },
  { role: "Craft Lead", introduction: "Protects the care, finish, and material integrity behind every final detail.", palette: ["#BDAE9A", "#614D38"] },
];

function PortraitPlaceholder({ index, palette }) {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${palette[0]}, ${palette[1]})` }}
    >
      <div className="absolute inset-x-0 bottom-0 h-3/5 rounded-t-[50%] bg-ink/20" />
      <div className="absolute left-1/2 top-[22%] w-[38%] aspect-square -translate-x-1/2 rounded-full bg-ivory/80" />
      <div className="absolute left-1/2 bottom-[12%] w-[68%] h-[42%] -translate-x-1/2 rounded-t-[50%] bg-ivory/75" />
      <span className="absolute left-5 top-5 font-sans text-xs tracking-[0.18em] text-ivory/80">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedMember(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {teamMembers.map((member, index) => (
          <button
            key={`${member.role}-${index}`}
            type="button"
            onClick={() => setSelectedMember({ ...member, index })}
            className="group text-left"
            aria-label={`Read about Team Member ${String(index + 1).padStart(2, "0")}`}
          >
            <PortraitPlaceholder index={index} palette={member.palette} />
            <div className="border-b border-hairline pt-5 pb-6 transition-colors group-hover:border-stone">
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-stone mb-2">
                {member.role}
              </p>
              <h2 className="font-serif text-2xl mb-3">Team Member {String(index + 1).padStart(2, "0")}</h2>
              <p className="font-sans text-sm leading-6 text-stone">
                {member.introduction}
              </p>
              <span className="inline-block font-sans text-xs uppercase tracking-[0.15em] mt-5 group-hover:text-stone">
                View Profile
              </span>
            </div>
          </button>
        ))}
      </section>

      {selectedMember && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 px-6"
          role="presentation"
          onMouseDown={() => setSelectedMember(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-member-dialog-title"
            className="relative w-full max-w-md bg-ivory p-8 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute right-5 top-5 w-9 h-9 flex items-center justify-center text-xl hover:text-stone"
              aria-label="Close profile"
            >
              ×
            </button>
            <p className="font-sans text-xs uppercase tracking-[0.16em] text-stone mb-3">
              {selectedMember.role}
            </p>
            <h2 id="team-member-dialog-title" className="font-serif text-3xl mb-5">
              Team Member {String(selectedMember.index + 1).padStart(2, "0")}
            </h2>
            <p className="font-sans leading-7 text-stone">
              {selectedMember.introduction}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
