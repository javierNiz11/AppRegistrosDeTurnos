import React from "react";
import { Link } from "react-router-dom";

const QuienesSomos = () => {
    return (
        <div className="bg-[#fdf6e3] min-h-screen font-sans text-gray-800">
            {/* Hero Section */}
            <div className="bg-[#800020] text-white py-20 px-6 text-center shadow-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Excelencia y Compromiso Legal
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                    Defendiendo tus derechos con integridad y experiencia desde hace más de 20 años.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
                {/* Nuestra Historia */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-[#800020] mb-6 border-b-2 border-[#800020] inline-block pb-2">
                            Nuestra Historia
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700 mb-4">
                            Fundado en 2005, nuestro estudio jurídico nació con la misión de brindar asesoramiento legal de alta calidad, accesible y humano. Entendemos que detrás de cada caso hay una persona, una familia o una empresa que necesita respuestas claras y soluciones efectivas.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700">
                            Nos especializamos en diversas ramas del derecho, adaptándonos a los cambios constantes de la legislación para ofrecer la mejor estrategia a nuestros clientes.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-xl border-l-4 border-[#800020]">
                        <h3 className="text-xl font-bold mb-4 text-[#800020]">¿Por qué elegirnos?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-[#800020] mr-2">✓</span>
                                <span>Atención personalizada y confidencial.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#800020] mr-2">✓</span>
                                <span>Trayectoria comprobada en litigios complejos.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#800020] mr-2">✓</span>
                                <span>Comunicación clara y transparente.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Nuestros Valores */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-[#800020] mb-10">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Integridad", desc: "Actuamos con ética y honestidad en cada paso del proceso legal." },
                            { title: "Excelencia", desc: "Buscamos la perfección técnica y estratégica en cada caso." },
                            { title: "Empatía", desc: "Escuchamos y comprendemos las necesidades de nuestros clientes." },
                        ].map((valor, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold text-[#800020] mb-3">{valor.title}</h3>
                                <p className="text-gray-600">{valor.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-[#800020] text-white rounded-2xl p-12 text-center shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6">¿Necesitás asesoramiento legal?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        No dejes pasar más tiempo. Reservá tu turno hoy mismo y dejá tu caso en manos de expertos.
                    </p>
                    <Link
                        to="/turno"
                        className="inline-block bg-[#fdf6e3] text-[#800020] font-bold py-3 px-8 rounded-full hover:bg-white transition-colors duration-300 shadow-lg transform hover:scale-105"
                    >
                        Reservar Turno
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default QuienesSomos;
