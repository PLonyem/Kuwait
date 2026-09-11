'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Quote, Star} from 'lucide-react';
import {useTranslations} from 'next-intl';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const reduceMotion = useReducedMotion();
  const testimonials = t.raw('items') as Testimonial[];

  return (
    <section className="w-full bg-white px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={reduceMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.6}}
          transition={{duration: 0.55}}
        >
          {t('title')}
        </motion.h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-primary/5 bg-white p-6 shadow-sm"
              initial={reduceMotion ? false : {opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.45, delay: reduceMotion ? 0 : index * 0.08}}
            >
              <Quote
                aria-hidden="true"
                className="absolute end-5 top-4 size-16 fill-primary text-primary opacity-10"
              />

              <div className="relative mb-5 flex gap-1 text-secondary" aria-hidden="true">
                {Array.from({length: 5}).map((_, starIndex) => (
                  <Star key={starIndex} className="size-5 fill-current" />
                ))}
              </div>

              <blockquote className="relative flex-1 text-lg leading-relaxed text-gray-700">
                <p>“{testimonial.quote}”</p>
              </blockquote>

              <div className="my-6 h-px bg-gray-200" aria-hidden="true" />

              <footer>
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="mt-1 text-sm text-gray-500">{testimonial.role}</p>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
