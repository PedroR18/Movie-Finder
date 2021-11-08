import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Rating({ rating }) {
  let color;
  if (rating < 3) {
    color = '#E14916';
  } else if (rating < 4) {
    color = '#E14916';
  } else if (rating < 5) {
    color = '#DC811A';
  } else if (rating < 5.6) {
    color = '#DA901B';
  } else if (rating < 6) {
    color = '#D9B720';
  } else if (rating < 6.6) {
    color = '#EFC52F';
  } else if (rating < 7) {
    color = '#DDDD0E';
  } else if (rating < 7.6) {
    color = '#BEEA22';
  } else if (rating < 8) {
    color = '#9BEB1F';
  } else if (rating < 8.6) {
    color = '#41b828';
  } else {
    color = '#47cf29';
  }
  const [ratingValue, setRatingValue] = useState(0);

  setTimeout(() => setRatingValue(rating), 100);
  return (
    <>
      <CircularProgressbar
        value={ratingValue}
        maxValue={10}
        text={`${rating}`}
        background={true}
        backgroundPadding={5}
        styles={buildStyles({
          textSize: '32px',
          pathColor: color,
          trailColor: 'rgba(215, 215, 215, 0.5)',
          textColor: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        })}
      />
    </>
  );
}
