import React from 'react';
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
  console.log(normalized)

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

  // for mobile phone, we outgauge earlier than on desktop
  const outgaugeThreshold = (window.innerWidth <= 760) ? 0.05 : 0.03;

  /* className={`ui ${majorityGrade.color} circular label`}*/
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <span >#{rank + 1}. </span>
          <span>{name}</span>
        </Card.Header>
        <Card.Description>

          <div className='median label'>
            <Label size="large" pointing='below' color={majorityGrade.color}>
              {majorityGrade.name}
            </Label>
          </div>
          <div className='bar-row'>
            <div className="bar-container">
              {GRADES.map((grade, index) => {
                const className = `${grade.color} bar result ${majorityGrade.value === grade.value ? 'majoritygrade' : ''}`
                const width = `${normalized[index] * 100 - 0.1}%`
                const textWidth = Math.floor(100 * normalized[index])

                return (
                  <div className={className} style={{"flex-basis": width}}>
                    {
                      normalized[index] < outgaugeThreshold ? (
                        <span
                          className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                          style={{
                            left: `${(normalized[index] * 100) / 2
                              }%`,
                          }}
                        >
                          {textWidth}%
                        </span>
                      ) : (
                        <span>
                          {Math.floor(100 * normalized[index])}%
                        </span>
                      )
                    }
                  </div>)
              }
              )}
            </div>
          </div>
          <div className='median dash'> </div>
        </Card.Description>
      </Card.Content >
      <Card.Content extra>
        <i className="vote yea icon"></i>
        {numVotes}{" "}
        avis exprimés

        <div className="right floated meta">
          <i className="info circle icon"></i>
          <a href='https://mieuxvoter.fr' target='_blank'>Plus de détails</a>
        </div>
      </Card.Content>
    </Card >
  )
}
export default Result;
