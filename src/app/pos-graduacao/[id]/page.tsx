import CoursePageModel from "@/components/CoursePageModel";
import { Cursos } from "@/utils/cursos";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GraduationCoursePage({ params }: PageProps) {
  const { id } = await params;

  const curso = Cursos.find((c) => c.id === id);

  if (!curso) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Pós-Graduação não encontrado</h1>
        <Link
          href="/"
          className="px-5 py-2.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors duration-300"
        >
          Voltar para Pós-Graduação
        </Link>
      </div>
    );
  }

  return <CoursePageModel curso={curso} type="pos" />;
}
