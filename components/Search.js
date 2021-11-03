import styles from '../styles/search.module.css';
export default function Search(props) {
  return (
    <div className={styles.container}>
      <div className={styles.switchsContainer}>
        <button
          className={
            props.contentType ? styles.activeMoviesButton : styles.moviesButton
          }
          onClick={() => props.toggleContent(true)}
        >
          Movies
        </button>
        <button
          className={
            props.contentType ? styles.seriesButton : styles.activeSeriesButton
          }
          onClick={() => props.toggleContent(false)}
        >
          TV Series
        </button>
      </div>
      <div className={styles.searchContainer}>
        <input
          onChange={props.onChange}
          value={props.searchQuery}
          className={styles.searchBar}
        />
      </div>
    </div>
  );
}
