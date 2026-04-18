"use client";
import { DocRowList } from "@/components/molecules/DocRowList";
import { DocumentToolbar } from "@/components/molecules/DocumentToolbar";
import { FolderRowList } from "@/components/molecules/FolderRowList";
import { ItemCard } from "@/components/molecules/ItemCard";
import { documentData } from "@/lib/utils/resource";
import { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineFolder,
} from "react-icons/hi2";

type Layout = "grid" | "list";

export default function Document() {
  const [layout, setLayout] = useState<Layout>("grid");
  const [search, setSearch] = useState("");
  const [folderOpen, setFolderOpen] = useState(true);
  const [docOpen, setDocOpen] = useState(true);

  const q = search.toLowerCase();
  const folders = documentData.folders.filter((f) =>
    f.name.toLowerCase().includes(q),
  );
  const docs = documentData.documents.filter((d) =>
    d.title.toLowerCase().includes(q),
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <DocumentToolbar
        search={search}
        layout={layout}
        onSearchChange={setSearch}
        onLayoutChange={setLayout}
        onAdd={() => console.log("add clicked")}
      />
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-5 space-y-7">
        {/* Folders section */}
        {folders.length > 0 && (
          <section>
            <div
              className="flex items-center justify-between mb-3 cursor-pointer select-none"
              onClick={() => setFolderOpen((prev) => !prev)}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Folder ({folders.length})
              </p>
              {folderOpen ? (
                <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <HiOutlineChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {folderOpen &&
              (layout === "grid" ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
                  {folders.slice(0, 1).map((f) => (
                    <ItemCard key={f.id} title={f.name} variant="folder" />
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden divide-y divide-slate-100">
                  {folders.slice(0, 1).map((f) => (
                    <FolderRowList key={f.id} folder={f} />
                  ))}
                </div>
              ))}
          </section>
        )}

        {/* Documents section */}
        {docs.length > 0 && (
          <section>
            <div
              className="flex items-center justify-between mb-3 cursor-pointer select-none"
              onClick={() => setDocOpen((prev) => !prev)}
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Document ({docs.length})
              </p>
              {docOpen ? (
                <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <HiOutlineChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {docOpen &&
              (layout === "grid" ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {docs.slice(0, 3).map((d) => (
                    <ItemCard key={d.id} title={d.title} variant="doc" />
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden divide-y divide-slate-100">
                  {docs.slice(0, 3).map((d) => (
                    <DocRowList key={d.id} doc={d} />
                  ))}
                </div>
              ))}
          </section>
        )}

        {/* Empty state */}
        {folders.length === 0 && docs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-2">
            <HiOutlineFolder className="w-12 h-12 opacity-30" />
            <p className="text-sm">Tidak ada item ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
