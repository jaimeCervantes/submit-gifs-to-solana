import styles from './List.module.css'

export default function List({ items }) {
  return (<section className={styles.List}>
    {
      items.map(item => (
        <article key={item} className="item">
          <img src={item} className={styles.itemImg} alt="healthy food"/>
        </article>
      ))
    }
  </section>)
}