import React from 'react';
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

const About = () => {
    return (
        <div className="bg-gray-100 text-gray-900">
            <MainNavbar />
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[130px] md:h-[200px] lg:h-128" style={{ backgroundImage: "url('images/about.png')" }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; About </h3>
            </div>
            <div className="my-5 text-center"><p className="text-2xl text-red-500">Founders of Altletico Brisbane Soccer Club </p></div>

            <div className="container mx-auto my-5 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <p className='text-[#3c3e40]'>React Hooks are a powerful feature that allow you to use state and other React features without writing a class. Hooks make it easier to share logic between components, reduce the complexity of your code, and improve performance. They also enable you to use functional components for more complex tasks, making your codebase more consistent and easier to understand. Whether you're building a small project or a large application, React Hooks can help you write more concise and readable code.</p>
                    <p className='text-[#3c3e40]'>The two most commonly used hooks are `useState` and `useEffect`. `useState` allows you to add state to functional components, while `useEffect` lets you perform side effects in function components. There are also other hooks like `useContext`, `useReducer`, `useCallback`, and `useMemo`, each serving specific purposes to enhance your React development experience. Understanding and utilizing these hooks effectively can significantly streamline your development process and improve the maintainability of your code.</p>
                </div>
            </div>
            <div className="container mx-auto my-10 px-5">
                <h1 className="text-3xl font-bold text-center mb-8">Meet The Team</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 1" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Joji</h2>
                        <p className="text-gray-600">Brief details about Person 1. React developer with a focus on hooks and state management.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 2" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Prince Anand</h2>
                        <p className="text-gray-600">Brief details about Person 2. Expert in frontend development and user experience design.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 3" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Saljo</h2>
                        <p className="text-gray-600">Brief details about Person 3. Passionate about creating efficient and scalable React applications.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 4" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Jibi</h2>
                        <p className="text-gray-600">Brief details about Person 4. Specializes in modern JavaScript frameworks and tooling.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 md:mt-4">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 1" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold"></h2>
                        <p className="text-gray-600">Brief details about Person 1. React developer with a focus on hooks and state management.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 2" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Person 2</h2>
                        <p className="text-gray-600">Brief details about Person 2. Expert in frontend development and user experience design.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 3" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Person 3</h2>
                        <p className="text-gray-600">Brief details about Person 3. Passionate about creating efficient and scalable React applications.</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                        <img src="https://via.placeholder.com/150" alt="Person 4" className="mx-auto rounded-full mb-4" />
                        <h2 className="text-xl font-semibold">Person 4</h2>
                        <p className="text-gray-600">Brief details about Person 4. Specializes in modern JavaScript frameworks and tooling.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;