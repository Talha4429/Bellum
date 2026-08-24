"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

const teamMembers = [
  {
    name: "Fatima Khan",
    role: "Founder & Creative Director",
    image: "/images/portfolio/hampstead-1.jpg",
    bio: "With over a decade of experience bridging regional craftsmanship with stark modern minimalism, Fatima leads Bellum's creative direction. Her philosophy centers on spatial silence—designing environments that allow materials and light to speak with honesty. Before founding Bellum, she honed her structural rigor across South Asia and Europe.",
    email: "fatima@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Julian Thorne",
    role: "Senior Architect",
    image: "/images/portfolio/hampstead-2.jpg",
    bio: "Julian specializes in contextual architecture and adaptive reuse. He oversees master planning and structural detailing for residential estates, ensuring every opening and elevation responds seamlessly to its orientation.",
    email: "julian@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aisha Rahman",
    role: "Lead Interior Designer",
    image: "/images/portfolio/hampstead-3.jpg",
    bio: "Aisha brings tactile nuance and textural warmth to Bellum's interiors. She works closely with local artisans to develop custom boucles, stone finishes, and bespoke millwork.",
    email: "aisha@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Zayn Malik",
    role: "Bespoke Furniture Designer",
    image: "/images/portfolio/hampstead-4.jpg",
    bio: "Zayn leads the furniture atelier, engineering geometric seating and monolithic console pieces with traditional mortise-and-tenon joinery and concealed steel armature.",
    email: "zayn@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mariam Tariq",
    role: "Project Director",
    image: "/images/portfolio/hampstead-5.jpg",
    bio: "Mariam manages the turnkey project lifecycle, coordinating site engineers, fabricators, and client liaisons to deliver flawless execution on schedule.",
    email: "mariam@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Hamza Siddiqui",
    role: "Craft & Material Specialist",
    image: "/images/misc/materials-board.jpg",
    bio: "Hamza oversees the selection and aging of raw timbers, marble slabs, and patinated metals, ensuring every Bellum piece preserves genuine material integrity.",
    email: "hamza@bellum.com.pk",
    linkedin: "https://linkedin.com",
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setSelectedMember(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone mb-8">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/about" className="hover:text-ink transition-colors">
          About
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-ink">Our Team</span>
      </div>

      {/* Header Section */}
      <header className="mb-16 max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-ink mb-4">
          Our Team
        </h1>
        <p className="font-sans text-base md:text-lg leading-relaxed text-stone">
          Meet the dedicated architects, designers, and artisans behind Bellum.
          A collective united by a shared devotion to spatial harmony and
          disciplined craft.
        </p>
      </header>

      {/* Team Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            onClick={() => setSelectedMember(member)}
            className="group cursor-pointer border border-[#E4E1DA] p-4 bg-white/30 hover:bg-white transition-all duration-300"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-[#f1edec] mb-4 border border-[#E4E1DA]">
              <SafeImage
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-ivory text-ink px-6 py-2.5 font-sans text-xs uppercase tracking-widest border border-stone/20 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View Profile
                </span>
              </div>
            </div>

            <div className="text-left pt-2">
              <h3 className="font-serif text-2xl text-ink mb-1 group-hover:text-stone transition-colors">
                {member.name}
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-stone">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/60 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-3xl bg-[#F7F5F1] border border-[#E4E1DA] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-ink hover:text-stone z-20 p-2"
              aria-label="Close profile"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {/* Photo Column */}
            <div className="w-full md:w-5/12 aspect-[4/5] md:aspect-auto relative bg-[#f1edec] border-b md:border-b-0 md:border-r border-[#E4E1DA]">
              <SafeImage
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Information Column */}
            <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <span className="font-sans text-xs uppercase tracking-widest text-stone border-b border-[#E4E1DA] pb-2 inline-block mb-3">
                  {selectedMember.role}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink">
                  {selectedMember.name}
                </h2>
              </div>

              <div className="font-sans text-sm md:text-base leading-relaxed text-stone space-y-4 mb-8">
                <p>{selectedMember.bio}</p>
              </div>

              <div className="flex gap-6 pt-4 border-t border-[#E4E1DA] font-sans text-xs uppercase tracking-widest text-ink">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="hover:text-stone transition-colors"
                >
                  Email
                </a>
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
