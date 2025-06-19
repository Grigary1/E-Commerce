import React from 'react'
import { useParams } from 'react-router-dom'
import Title from '../components/Title';
import Trending from '../components/Trending';
import Brands from '../components/Brands';

const Overview = () => {
    const { tag } = useParams();

    return (
        <div>
            <div>
                <Title text1={'Trending'} />
                <Trending tag={tag}/>
                <Brands category={tag}/>
            </div>
        </div>
    )
}

export default Overview