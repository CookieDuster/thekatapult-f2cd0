import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import _ from "lodash"

import { safePrefix, markdownify } from "../utils"

const NewsletterForm = () => {
  const [email, set_email] = React.useState("")
  const [submitted, set_submitted] = React.useState()

  const onSubmit = async e => {
    e.preventDefault()
    await addToMailchimp(email)
    set_submitted(true)
  }

  const onChange = e => {
    e.preventDefault()
    set_email(e.target.value)
  }

  if (submitted) {
    return <h2>Uspeh!</h2>
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" placeholder="E-mail" type="email" required onChange={onChange} />
      <div style={{ fontSize: 16, marginBottom: 20 }}>
        Prijavom na nasu listu prihvatate uslove koriscenja sajta{" "}
      </div>
      <button type="submit" style={{ backgroundColor: "#030047" }}>
        Prijavi se!
      </button>
    </form>
  )
}

export default class SectionHero extends React.Component {
  render() {
    let section = _.get(this.props, "section", null)
    return (
      <section id={_.get(section, "section_id", null)} className="block hero-block bg-accent outer">
        <div className="inner">
          <div className="grid">
            {_.get(section, "image", null) && (
              <div className="cell block-preview">
                <img
                  src={safePrefix(_.get(section, "image", null))}
                  alt={_.get(section, "title", null)}
                />
              </div>
            )}
            <div className="cell block-content">
              {_.get(section, "title", null) && (
                <h2 className="block-title underline">{_.get(section, "title", null)}</h2>
              )}
              <div className="block-copy">{markdownify(_.get(section, "content", null))}</div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
