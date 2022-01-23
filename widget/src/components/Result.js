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
  const normalized = grades.map(m => m / numVotes)

  // find the majority grade
  let majorityGrade = GRADES[0]
  let accAfter = 0
  let accBefore = 0
  let isAfter = false
  let isBefore = true
  for (const gradeId in grades) {
    if (isBefore) {
      accBefore += grades[gradeId]
    }
    if (isAfter) {
      accAfter += grades[gradeId]
    }
    if (isBefore && accBefore > numVotes / 2) {
      majorityGrade = GRADES[gradeId]
      accBefore -= grades[gradeId]
      isBefore = false
      isAfter = true
    }
  }

  // is proponent higher than opposant?
  const proponentMajority = accAfter > accBefore;



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
            <div className={`proponents ${proponentMajority ? 'majority' : ''}`} style={{'flex-basis': `${accBefore / numVotes * 100}%`}}>
              {GRADES.map((grade, index) => {
                if (grade.value <= majorityGrade.value) {
                  return null;
                }
                const className = `${grade.color} bar result`
                const width = `${normalized[index] * 100 * numVotes / accBefore}%`
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
            {GRADES.map((grade, index) => {
              if (grade.value !== majorityGrade.value) {
                return null;
              }
              const className = `${grade.color} bar result majoritygrade`
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
            <div className={`opponents ${proponentMajority ? '' : 'majority'}`} style={{'flex-basis': `${accAfter / numVotes * 100}%`}}>
              {GRADES.map((grade, index) => {
                if (grade.value >= majorityGrade.value) {
                  return null;
                }

                const className = `${grade.color} bar result ${majorityGrade.value === grade.value ? 'majoritygrade' : ''}`
                const width = `${normalized[index] * 100 * numVotes / accAfter}%`
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
          <a href='https://mieuxvoter.fr' target='_blank' rel='noreferrer'>Plus de détails</a>
        </div>
      </Card.Content>
    </Card >
  )
}
export default Result;
