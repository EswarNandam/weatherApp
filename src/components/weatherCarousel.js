import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import Carousel from 'react-multi-carousel';

const useeStyles = makeStyles({
    root: {
        minWidth: 300,
        height: 200,
        border: '1px solid black',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'start',
        margin: 20,
        transition: 'all .5s ease-in-out',
    },
    selectedCard: {
        transform: 'scale(1.03)',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});

function renderSlides(weatherData, selectedValue, currentIndex) {
    const classes = useeStyles();
    return (
        weatherData && weatherData.map((data, index) => (
            <div key={index}>
                <Card className={`${classes.root} ${currentIndex === index && classes.selectedCard}`}>
                    <CardContent className={classes.title}>
                        <div><b>Temp: </b>{selectedValue === 'celsius' ? `${Math.trunc(data.avgTempCelsius)} C` : `${Math.trunc(data.avgTemp)} F`}</div>
                        <br />
                        <div><b>Date: </b>{data.date}</div>
                    </CardContent>
                </Card>
            </div>
        )))
};

export default function WeatherCarousel({data, selectedValue, currentIndex, setCurrentIndex}) {
    return (
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={true}
                afterChange={(previousSlide, _ref) => setCurrentIndex(_ref.currentSlide)}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                slidesToShow={2}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {renderSlides(data, selectedValue, currentIndex)}
            </Carousel>
        );
};