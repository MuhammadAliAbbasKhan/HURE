import { FaStar } from 'react-icons/fa';
import websites from '../../utils/Website/Website_Info.js';
import { useTranslation } from 'react-i18next';

const Testimonial = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: t("Aisha Al-Farsi"),
      role: t("Entrepreneur"),
      content: t(`${websites[0].name} provides outstanding quality and professional service. Highly recommended.`),
      rating: 5
    },
    {
      id: 2,
      name: t("James O'Connor"),
      role: t("Creative Professional"),
      content: t(`${websites[0].name} has been essential to my digital presence. Great experience overall.`),
      rating: 4.5
    },
    {
      id: 3,
      name: t("Li Wei"),
      role: t("Online Seller"),
      content: t(`Reliable, fast, and very polished — ${websites[0].name} knows how to deliver excellence.`),
      rating: 4
    },
  ];

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < fullStars || (halfStar && i === fullStars) ? 'text-[#8D6E63]' : 'text-[#F4F1ED]'}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F1ED]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#263238]">
            {t("Client Testimonials")}
          </h2>
          <div className="w-20 h-1 bg-[#8E9B97] mx-auto" />
        </div>

        <div className="space-y-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-2xl p-10 shadow-lg max-w-4xl mx-auto hover:shadow-xl transition-shadow border-l-8 border-[#607D8B]"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8D6E63"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10V8m0 2v2m0-2h2m-2 0H8m6 0h-2m2 0v2m0-2V8" />
                  </svg>
                </div>

                <div className="flex-1">
                  <p className="text-[#263238] mb-6 text-lg leading-relaxed">
                    {testimonial.content}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-[#8D6E63] text-xl">{testimonial.name}</h4>
                      <p className="text-[#607D8B]">{testimonial.role}</p>
                    </div>

                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
