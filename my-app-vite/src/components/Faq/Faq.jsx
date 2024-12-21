import React from "react";
import styles from "./Faq.module.css";
import { Collapse } from "antd";
import { useFaqs } from "../../constants/FaqConstants";
export default function Faq() {
  const { Panel } = Collapse;
  const faqs = useFaqs();

  return (
    <div className={styles.mainDiv}>
      {faqs.map((el, index) => (
        <Collapse key={index}>
          <Panel header={el.label} key={el.key} className={styles.panel}>
            <p>{el.children}</p>
          </Panel>
        </Collapse>
      ))}
    </div>
  );
}