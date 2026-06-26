import CoursePageModel from "@/components/CoursePageModel";
import { Cursos } from "@/utils/cursos";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fromFiltro?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { fromFiltro } = await searchParams;

  const curso = Cursos.find((c) => c.id === id);

  if (!curso) {
    notFound();
  }

  const tipoCurso = curso.nivel === "pos" ? "pos" : "graduacao";

  return <CoursePageModel curso={curso} type={tipoCurso} activeFilter={fromFiltro} />;
}

export async function generateStaticParams() {
  return Cursos.map((c) => ({
    id: c.id,
  }));
}
