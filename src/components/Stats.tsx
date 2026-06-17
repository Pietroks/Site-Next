import { Animated } from "./Animated";

export default function Stats() {
  const stats = [
    {
      image: "/20+.png",
      alt: "Mais de 20 anos de experiência",
      value: (
        <>
          20<span className="md:text-2xl lg:text-4xl">+</span>
        </>
      ),
      description: "Anos de experiência",
    },
    {
      image: "/120mil.png",
      alt: "Mais de 120 mil alunos formados",
      value: (
        <>
          120 <span className="md:text-2xl lg:text-4xl">mil</span>
        </>
      ),
      description: "Alunos formados",
    },
    {
      image: "/80+.png",
      alt: "Mais de 80 cursos",
      value: (
        <>
          80<span className="md:text-2xl lg:text-4xl">+</span>
        </>
      ),
      description: "Cursos ofertados",
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-0">
        {stats.map((stat, index) => (
          <Animated
            key={index}
            as="div"
            preset="fadeScale"
            delay={index * 0.15}
            className={`text-left flex items-center gap-4 text-primary px-10 ${
              index === 1 ? "border-r-gray-200 border-l-gray-200 border-2 border-t-0 border-b-0" : ""
            }`}
          >
            <img src={stat.image} alt={stat.alt} className="w-30 md:w-20" />

            <div className="flex flex-col">
              <h2 className="md:text-2xl lg:text-5xl font-bold">{stat.value}</h2>
              <p>{stat.description}</p>
            </div>
          </Animated>
        ))}
      </div>
    </section>
  );
}
