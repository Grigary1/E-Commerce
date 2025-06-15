import React from 'react'
import { useParams } from 'react-router-dom'
import Title from '../components/Title';
import Trending from '../components/Trending';

const Overview = () => {
    const { tag } = useParams();

    return (
        <div>
            <div>
                <Title text1={'Trending'} />
                <Trending tag={tag}/>
            </div>
        </div>
    )
}

export default Overview