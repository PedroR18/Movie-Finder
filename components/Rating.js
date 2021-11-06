import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Rating({ rating }) {
  let color;
  if (rating < 3) {
    color = 'red';
  } else if (rating < 5) {
    color = 'orange';
  } else if (rating < 7) {
    color = 'yellow';
  } else if (rating < 9) {
    color = '#006400';
  } else {
    color = 'green';
  }
  return (
    <>
      <div className={'ratingWrapper'}>
        <CircularProgressbar
          value={rating}
          maxValue={10}
          text={`${rating}`}
          styles={buildStyles({
            textSize: '32px',
            pathColor: color,
            trailColor: 'white',
            textColor: 'rgb(255,255,255)',
          })}
        />
        ;
      </div>
      <style jsx>{`
        .ratingWrapper {
          position: absolute;
          height: 50px;
          width: 50px;
          top: 0;
          right: 0;
        }
      `}</style>
    </>
  );
}
