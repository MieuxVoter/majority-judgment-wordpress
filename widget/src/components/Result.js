import React from "react"
import {Card, Label} from "semantic-ui-react"

export const GRADES = [
  {name: "A rejeter", color: "red", value: 1},
  {name: "Mauvais", color: "orange", value: 2},
  {name: "Passable", color: "yellow", value: 3},
  {name: "Bien", color: "olive", value: 4},
  {name: "Excellent", color: "green", value: 5},
]

const Result = ({name, grades}) => {
  /**
   * name: candidate name
   * grades: list of grades ordered by increasing importance.
   */
  const numVotes = grades.reduce((a, b) => a + b, 0)
  const normalized = grades.map(m => m / numVotes)

  let rank = 1

  let majorityGrade
  let acc = 0
  for (const gradeId in grades) {
    acc += grades[gradeId]
    if (acc > numVotes / 2) {
      majorityGrade = GRADES[gradeId]
      break
    }
  }

  return (
    <Card fluid>
      <Card.Content>
        <Label size="large" className={`${majorityGrade.color} right floated`}>
          {majorityGrade.name}
          <div className="detail"># {rank + 1}</div>
        </Label>
        <Card.Header>{name}</Card.Header>
        <Card.Description style={{marginBottom: "1em"}}>
          <div className="median"></div>
          <div className="median-label">50%</div>
          <table style={{width: "100%"}}>
            <tbody>
              <tr>
                {GRADES.map((grade, index) => (
                  <td
                    className={`${grade.color} result`}
                    key={index}
                    style={{
                      width: `${normalized[index] * 100}%`,
                    }}
                  >
                    {normalized[grade.value] < 0.05 ? (
                      <span
                        className="outgauge"
                        style={{
                          left: `${(normalized[index] * 100) / 2
                            }%`,
                          top: index % 2 == 0 ? "-20px" : "25px",
                        }}
                      >
                        {Math.floor(100 * normalized[index])}%
                      </span>
                    ) : (
                      <span>
                        {Math.floor(100 * normalized[index])}%
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <i className="vote yea icon"></i>
        {numVotes}{" "}
        avis exprimés
      </Card.Content>
    </Card>
  )
}
export default Result;
