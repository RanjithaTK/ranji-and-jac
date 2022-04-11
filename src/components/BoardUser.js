import React, { useState, useEffect } from "react"
import userService from "../services/user.service"
import { useParams, Link } from "react-router-dom"
const BoardUser = () => {
  const { id } = useParams()
  //   console.log(id)
  const [content, setContent] = useState([])
  // const [content, setContent] = useState([]);

  useEffect(() => {
    userService.getUserBoard().then(
      (response) => {
        setContent(response.data.data)
        console.log(response.data.data)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setContent(_content)
      }
    )
  }, [id])
  return (
    <div className="row">
      {content &&
        content.map((cont, index) => (
          <div className="col-sm-6 col-md-3 mb-3">
            <Link to={"/" + cont._id}>
              <img
                src={`${cont.category}/${cont.path}`}
                alt={cont.path}
                className="img-fluid w-100 h-75"
              />
            </Link>
          </div>
        ))}
    </div>
  )
}
export default BoardUser
