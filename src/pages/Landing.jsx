import Goals from '../components/landing/goals';
import Categories from '../components/landing/categories';
import { Hero } from '../components/landing/Hero';

export const Landing = () => {
    return (
        <div>
            <Hero />
            <Goals />
            <Categories />
        </div>
    )
}