"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/SafeImage";

export const teamMembers = [
  {
    name: "Shahan Josh",
    role: "Co-Founder & CEO",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "Coming from a business-oriented background, Shahan Josh brings an entrepreneurial outlook to Bellum’s growth and direction. He oversees business strategy, partnerships, and new initiatives, guiding the brand’s expansion while maintaining its commitment to quality and long-term client relationships. His focus is to develop Bellum not only as a furniture brand, but as a complete design and lifestyle solution.",
  },
  {
    name: "Malik Taha",
    role: "CEO & Co-Founder",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "Malik Taha, an architect by training, is the visionary co-founder behind Bellum, bringing a design-led perspective to every aspect of the brand. His architectural foundation shapes how Bellum approaches spaces — balancing aesthetics, functionality, and thoughtful detail — while his focus on customer development ensures that every interaction feels personal and meaningful. Overseeing both the brand’s design philosophy and its client experience, Malik ensures that Bellum doesn’t just create furniture, but crafts environments that tell a story. Under his leadership, the brand continues to evolve as a space where refined living, timeless design, and curated experiences converge seamlessly.",
  },
  {
    name: "Maria Khalil",
    role: "Chief Operating Officer (COO)",
    image: "https://media.istockphoto.com/id/2062236772/vector/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user.jpg?s=612x612&w=0&k=20&c=k89Udc50y4K9hik9ZYBDz0gVsCzSeXgPcTRBN5aPy94=",
    bio: "As Chief Operating Officer at Bellum, Maria Khalil oversees day-to-day operations and project coordination, ensuring a seamless transition from concept to execution and a consistent client experience across all projects. Prior to joining Bellum, she spent seven years with YOCA/NBCL following early professional experience with Architects Inc. She graduated in Architecture from Beaconhouse National University, Lahore, bringing an architectural perspective that supports Bellum’s growing design and turnkey capabilities.",
  },
  {
    name: "Bilal Josh",
    role: "Head of Production & Supply Chain",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "Bilal Josh oversees Bellum’s production and supply chain operations, ensuring that the brand’s commitment to quality and craftsmanship is upheld at every stage of creation. With a strong focus on precision and efficiency, he bridges design intent with execution, transforming concepts into finely crafted pieces. From managing production workflows to streamlining sourcing and logistics, Bilal plays a critical role in maintaining consistency, timelines, and the integrity of every product that leaves Bellum. His approach combines operational discipline with an understanding of design sensibilities, allowing him to support the brand’s bespoke nature without compromising on quality. At Bellum, he ensures that behind every refined piece lies a process that is just as thoughtful, reliable, and meticulously executed.",
  },
  {
    name: "Zara Reza",
    role: "Design Director",
    image: "https://media.istockphoto.com/id/2062236772/vector/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user.jpg?s=612x612&w=0&k=20&c=k89Udc50y4K9hik9ZYBDz0gVsCzSeXgPcTRBN5aPy94=",
    bio: "Zara Shahan leads the creative vision at Bellum, shaping the brand’s aesthetic language and ensuring a cohesive design identity across every touchpoint. With a refined eye for detail and a deep understanding of spatial harmony, she brings together furniture, décor, and interiors into a seamless expression of style and intent. Overseeing everything from brand persona to client-facing design concepts, Zara plays a central role in translating Bellum’s philosophy into lived experiences. Her approach is both intuitive and intentional — curating spaces that are not only visually striking but also deeply aligned with how clients envision their environments. At Bellum, she ensures that every project carries a distinct sense of character, where design is not just seen, but felt — thoughtful, immersive, and timeless.",
  },
  {
    name: "Usman Ahmad",
    role: "Chief Financial Officer (CFO)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "Usman Ahmad is a seasoned Chief Financial Officer with over 15 years of leadership experience across FMCG, Food, and manufacturing sectors in Pakistan. He combines strong financial discipline with commercial insight, leading strategy, plant finance, ERP systems, and governance frameworks. Known for his practical intelligence and balanced leadership style, he partners closely with operations to drive profitability, strengthen controls, and build high-performing finance teams.",
  },
  {
    name: "Natalia Rashid",
    role: "General Manager",
    image: "https://media.istockphoto.com/id/2062236772/vector/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user.jpg?s=612x612&w=0&k=20&c=k89Udc50y4K9hik9ZYBDz0gVsCzSeXgPcTRBN5aPy94=",
    bio: "Natalia Rashid serves as the General Manager Operations at Bellum, overseeing daily operations, team coordination, and execution management across the organization. With a strong focus on operational efficiency and client experience, she ensures that Bellum maintains its refined standards of quality, professionalism, and seamless service delivery. She works closely with all departments to streamline workflows, coordinate project execution, manage client-related operations, and ensure smooth delivery processes across every stage of the customer experience.",
  },
  {
    name: "Mohsin Butt",
    role: "Head Of Retail",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "With over 12 years of experience spanning luxury lifestyle, furniture, and banking sectors, Mohsin Butt brings a composed and client-focused approach to Bellum’s retail operations. His professional journey includes associations with renowned names such as Kalamkaar, Kit & Kaboodle, Celeste, Marina, and HBL, where he developed a deep understanding of service excellence, relationship management, and refined customer experience. At Bellum, he leads the retail environment with attention to detail and discretion, ensuring every interaction reflects the brand’s philosophy of thoughtful service and enduring quality. With a focus on building meaningful relationships, Mohsin translates customer insights into experiences that are both seamless and inspiring. His expertise in retail strategy and client engagement allows Bellum to not only showcase its products but also craft journeys that feel curated, memorable, and true to the brand’s ethos of refined living.",
  },
  {
    name: "Umair Tayyab",
    role: "Head Of Marketing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZrgG15jPYp8xHYOsME_TAs1DH0ww9C9uC5Hjq25eRA&s=10",
    bio: "With over 15 years of marketing experience, Umair Tayyab serves as the Head of Marketing at Bellum, leading the brand's marketing strategy, communication, and creative direction across multiple platforms. Having worked with brands such as Samsung, Pepsi, and Kit & Kaboodle, he brings extensive experience in brand development, customer engagement, and integrated marketing campaigns. At Bellum, he focuses on strengthening the brand's presence through thoughtful storytelling, luxury positioning, and creative brand experiences. He works closely with design, operations, and business development teams to ensure that Bellum's identity and vision are reflected consistently across every customer touchpoint.",
  },
];

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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            onClick={() => setSelectedMember(member)}
            className="group cursor-pointer border border-[#E4E1DA] p-4 bg-white/40 hover:bg-white transition-all duration-300 flex flex-col"
          >
            <div className="aspect-square relative overflow-hidden bg-[#F7F5F1] mb-4 border border-[#E4E1DA] flex items-center justify-center">
              <SafeImage
                src={member.image}
                alt={member.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-ivory text-ink px-5 py-2 font-sans text-xs uppercase tracking-widest border border-stone/20 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-medium">
                  View Profile
                </span>
              </div>
            </div>

            <div className="text-left pt-2 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl text-ink mb-1 group-hover:text-stone transition-colors">
                  {member.name}
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-stone">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

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
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-ink hover:text-stone z-20 p-2"
              aria-label="Close profile"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="w-full md:w-5/12 aspect-square md:aspect-auto relative bg-[#F7F5F1] border-b md:border-b-0 md:border-r border-[#E4E1DA] flex items-center justify-center p-6 min-h-[280px]">
              <SafeImage
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-contain p-6"
              />
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <span className="font-sans text-xs uppercase tracking-widest text-stone border-b border-[#E4E1DA] pb-2 inline-block mb-3">
                  {selectedMember.role}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-ink">
                  {selectedMember.name}
                </h2>
              </div>

              <div className="font-sans text-sm md:text-base leading-relaxed text-stone space-y-4">
                <p>{selectedMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
