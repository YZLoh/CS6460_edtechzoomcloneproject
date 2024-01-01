import React, { useState } from "react"
import { useNavigate } from "react-router"
import "./meet-home.css"
import { createSession } from "../services/videoCallService"
import Navbar from "../components/Navbar"

export const Home = () => {
  const [host, setHost] = useState("")
  const [title, setTitle] = useState("")
  const [password, setPassword] = useState("")
  const history = useNavigate()

  const onSubmit = event => {
    event.preventDefault()
    createSession(host, title, password)
      .then(response => {
        history(`/meeting/${response.data.socket}`)
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  return (
    <div className="container">
    <Navbar />
      <div className="body">
        <span className="body__title">
          Create a meeting and invite others to join you.
        </span>
        <form onSubmit={onSubmit} className="body__form">
          <div className="body__form__inputs">
            <input
              placeholder="Host"
              className="body__form__inputs__input"
              type="text"
              value={host}
              onChange={event => setHost(event.target.value)}
              required
              autoComplete={"on"}
            />
            <input
              placeholder="Title"
              className="body__form__inputs__input"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
              autoComplete={"on"}
            />
            <input
              placeholder="Password"
              className="body__form__inputs__input"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete={"on"}
            />
          </div>
          <div className="body__form__create">
            <button className="body__form__create__btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
