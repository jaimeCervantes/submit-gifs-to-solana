import styles from './List.module.css'

export default function List({ items }) {
  console.log(items);
  return (<section className={styles.List}>
    {
      items.map(item => (
        <article key={item.gifLink} className="item">
          <img src={item.gifLink} className={styles.itemImg} alt="healthy food"/>
        </article>
      ))
    }
  </section>)
}