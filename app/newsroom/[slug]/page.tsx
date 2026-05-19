import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Bebas_Neue, Outfit } from "next/font/google";
import ReactMarkdown from "react-markdown";
import { allNews } from "../_newsdata/newsData";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-outfit" });

export async function generateStaticParams() {
  return allNews.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // 1. Find the article metadata
  const article = allNews.find((n) => n.slug === params.slug);
  
  if (!article) {
    notFound();
  }

  // 2. Read the Markdown file securely from the server
  const filePath = path.join(process.cwd(), "app/newsroom/_content", `${params.slug}.md`);
  let markdownContent = "";
  try {
    markdownContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    markdownContent = "> *Content for this article is currently being written by our field team. Please check back later.*";
  }

  return (
    <article className={`w-full bg-[#FAF7F2] ${bebasNeue.variable} ${outfit.variable} py-16 md:py-24`}>
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        
        {/* ── Article Hero Block ── */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#ca5310] text-white px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] shadow-sm">
              {article.category}
            </span>
            <span className="text-[#a8c69f] text-[11px] font-bold uppercase tracking-widest font-[family-name:var(--font-outfit)]">
              {article.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-10">
            {article.title}
          </h1>

          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl relative">
            <img 
              src={article.thumbnail} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* ── Premium Markdown Renderer ── */}
        <div className="w-full">
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="text-[#4a5d46] font-[family-name:var(--font-outfit)] text-[17px] md:text-lg leading-[1.8] mb-8" {...props} />,
              
              h2: ({ node, ...props }) => (
                <div className="flex items-center gap-4 mt-16 mb-6">
                  <span className="w-8 h-[2px] bg-[#ca5310]" />
                  <h2 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide m-0" {...props} />
                </div>
              ),
              
              h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl text-[#4d7c0f] font-[family-name:var(--font-outfit)] font-bold tracking-wide mt-10 mb-4" {...props} />,
              
              ul: ({ node, ...props }) => <ul className="list-none pl-0 mb-8 space-y-4 text-[#4a5d46] font-[family-name:var(--font-outfit)] text-[17px] md:text-lg" {...props} />,
              
              li: ({ node, ...props }) => {
                // @ts-ignore
                const { ordered, ...rest } = props;
                return (
                  <li className="flex items-start">
                    {!ordered && <span className="text-[#ca5310] mr-3 mt-1.5 text-[10px]">■</span>}
                    <span {...rest} />
                  </li>
                );
              },
              
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-8 space-y-4 text-[#4a5d46] font-[family-name:var(--font-outfit)] text-[17px] md:text-lg marker:text-[#ca5310] marker:font-bold" {...props} />,
              
              strong: ({ node, ...props }) => <strong className="font-bold text-[#1a2e15]" {...props} />,
              
              blockquote: ({ node, ...props }) => (
                <blockquote className="relative border-l-4 border-[#ca5310] pl-6 md:pl-8 py-2 my-10 bg-white/50 rounded-r-2xl" {...props}>
                  <span className="absolute top-2 left-4 text-4xl text-[#ca5310]/20 font-serif leading-none">"</span>
                  <div className="italic text-[#1a2e15] font-medium text-xl md:text-2xl leading-relaxed relative z-10 font-[family-name:var(--font-outfit)]" {...props} />
                </blockquote>
              ),
              
              a: ({ node, ...props }) => <a className="text-[#ca5310] font-bold underline decoration-[#ca5310]/30 underline-offset-4 hover:decoration-[#ca5310] transition-all" {...props} />,
              
              img: ({ node, ...props }) => (
                <span className="block my-12 rounded-2xl overflow-hidden shadow-lg border border-[#e8efe6]">
                  <img className="w-full h-auto object-cover" {...props} />
                </span>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>

      </div>
    </article>
  );
}