import React from 'react';

const testimonials = [
  {
    name: 'Noby Thomas',
    text: 'My kids enjoy playing at Atletico Soccer Club. This club is friendly and has been amazing for my kids. Everyone is supportive, and the environment is fantastic!',
    photo:'images/noby_test.png'
  },
  {
    name: 'Haju Thomas',
    text: "My son is really happy playing with his friends at Atletico. The community is welcoming, and the training is excellent. I'm really keen to see Atletico achieve more victories in the years to come.",
    photo:'images/hajutest_1.PNG'
  },
  {
    name: 'Jibi',
    text: 'Everyone at the club is doing their very best to build competitive games at Atletico. The club is very supportive in developing kids to excel in soccer. I am happy and eagerly looking forward to seeing the kids perform in the next tournament.',
    photo:'images/jibi_test.png'
  },
];

const Testimonials = () => {
  return (
    <div className="py-8 bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700 text-lg italic mb-4">"{testimonial.text}"</p>
              <p className="text-gray-900 font-semibold text-right">- {testimonial.name}</p>
              <img src={testimonial.photo} alt="Player" className="w-12 h-12 rounded-full ml-2 mr-2 justify-end" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
