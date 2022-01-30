import React from 'react';
import {Card, Label} from "semantic-ui-react"


export const GRADES = [
  {name: "Très bien", color: "darkgreen", value: 5},
  {name: "Bien", color: "green", value: 4},
  {name: "Assez bien", color: "olive", value: 3},
  {name: "Passable", color: "yellow", value: 2},
  {name: "Insuffisant", color: "orange", value: 1},
]

const Result = ({name, grades, rank}) => {
  /**
   * name: candidate name
   * grades: list of grades ordered by increasing importance.
   */
  const numVotes = grades.reduce((a, b) => a + b, 0)
  const numGrades = grades.length
  const normalized = grades.map(m => m / numVotes)

  // find the majority grade
  let majorityGrade = GRADES[0]
  let accProponent = 0
  let accOpponent = 0
  let isProponent = false
  let isOpponent = true
  console.log("grades", grades)
  for (const gradeId in grades) {
    if (isOpponent) {
      accOpponent += grades[numGrades - 1 - gradeId]
    }
    if (isProponent) {
      accProponent += grades[numGrades - 1 - gradeId]
    }
    if (isOpponent && accOpponent > numVotes / 2) {
      majorityGrade = GRADES[numGrades - 1 - gradeId]
      accOpponent -= grades[numGrades - 1 - gradeId]
      isOpponent = false
      isProponent = true
      console.log("MG", majorityGrade.name)
    }
    console.log(numGrades - gradeId)
    console.log(grades[numGrades - 1 - gradeId], GRADES[numGrades - 1 - gradeId].name, "Prop", accProponent, "opp", accOpponent)
  }

  // is proponent higher than opposant?
  const proponentMajority = accProponent > accOpponent;
  const proponentNorm = accProponent / numVotes;
  const opponentNorm = accOpponent / numVotes;



  // for mobile phone, we outgauge earlier than on desktop
  const outgaugeThreshold = (window.innerWidth <= 760) ? 0.05 : 0.03;

  return (
    <Card fluid className='mv'>
      <Card.Content>
        <Card.Header>
          <span ># {rank}. </span>
          <span>{name}</span>
        </Card.Header>
        <Card.Description>

          <div className='median label'>
            <Label size="large" pointing='below' color={majorityGrade.color}>
              {majorityGrade.name}
            </Label>
          </div>
          <div className='bar-row'>
            <div className={`proponents ${proponentMajority ? 'majority' : ''}`} style={{'flex-basis': `${accProponent / numVotes * 100}%`}}>
              {// OPPONENTS
                GRADES.map((grade, index) => {
                  if (grade.value <= majorityGrade.value) {
                    return null;
                  }
                  const className = `${grade.color} bar result`
                  const width = grades[index] * 100 / accProponent
                  console.log(grades[index], accProponent, width)
                  // console.log(normalized[index])
                  const textWidth = Math.floor(100 * normalized[index])

                  return (
                    <div className={className} key={index} style={{"flex-basis": `${width}%`}}>
                      {
                        normalized[index] < outgaugeThreshold ? (
                          <span
                            className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                            style={{
                              left: `${(width) / 2
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
            {// DISPLAY MAJORITY JUDGMENT
              GRADES.map((grade, index) => {
                if (grade.value !== majorityGrade.value) {
                  return null;
                }
                const className = `${grade.color} bar result majoritygrade`
                const width = normalized[index] * 100
                // console.log(normalized[index])
                const textWidth = Math.floor(100 * normalized[index])

                return (
                  <div className={className} key={index} style={{"flex-basis": `${width}%`}}>
                    {
                      normalized[index] < outgaugeThreshold ? (
                        <span
                          className={`outgauge ${index % 2 ? 'above' : 'below'}`}
                          style={{
                            left: `${width * 100 / 2}%`,
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
            <div className={`opponents ${proponentMajority ? '' : 'majority'}`} style={{'flex-basis': `${opponentNorm * 100}%`}}>
              {GRADES.map((grade, index) => {
                if (grade.value >= majorityGrade.value) {
                  return null;
                }

                const className = `${grade.color} bar result ${majorityGrade.value === grade.value ? 'majoritygrade' : ''}`
                const width = `${normalized[index] * 100 * numVotes / accOpponent}%`
                const textWidth = Math.floor(100 * normalized[index])

                return (
                  <div className={className} key={index} style={{"flex-basis": width}}>
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
            <div className='median dash'> </div>
          </div>
        </Card.Description>
      </Card.Content >
      <Card.Content extra>
        <i className="vote yea icon"></i>
        {numVotes}{" "}
        avis exprimés

        <div className="right floated meta">
          <i className="info circle icon"></i>
          <a href='https://mieuxvoter.fr' target='_blank' rel='noreferrer'>Plus de détails</a>
        </div>
      </Card.Content>
    </Card >
  )
}
export default Result;
