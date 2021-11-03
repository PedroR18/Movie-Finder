import styles from '../styles/fixednav.module.css';

export default function FixedNav(props) {
  return (
    <>
      <button
        onClick={props.generateRecommendations}
        className={styles.results}
      >
        Results
      </button>
      <button className={styles.fav}>Fav</button>
    </>
  );
}
