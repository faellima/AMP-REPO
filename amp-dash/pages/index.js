import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { CRow, CCol, CWidgetStatsE, CListGroup, CListGroupItem, CBadge, CCard, CCardBody } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import _ from 'lodash'

export default function Home({
  bugs,
  bugInWeek,
  bugsByArea,
  bugOpenedByArea,
  bugClosedByArea,
  bugOpenedByMember,
  bugResolvedByMember,
  testsByArea,
  testsByCloseArea,
  testExecutions,
  testsByOpenedArea,
  project
}) {
  return (
    <div className={styles.container}>
      {/* <CContainer className="px-4"> */}
      <CRow>
        <h1> Dashboard - {project}</h1>
        <br />
      </CRow>

      <CRow>
        <CCol xs={4}>
          <CWidgetStatsE
            className="mb-4"
            title="Quantidade de Bugs registrados"
            value={<h1>{bugs.length}</h1>}
          />
        </CCol>
        <CCol xs={4}>
          <CWidgetStatsE
            className="mb-3"
            title={`Bugs por semana ${moment().day(0).format('DD/MM')} - ${moment().day(3).format('DD/MM')}`}
            value={<h1>{bugInWeek.length}</h1>}
          />
        </CCol>
        <>
          {
            testExecutions?.map((test, i) =>
              <CCol
                key={i}
                xs={4}>
                <CWidgetStatsE

                  className="mb-3"
                  title={test.display}
                  value={<h1>{test.value}</h1>}
                />
              </CCol>
            )
          }
        </>
      </CRow>

      <CRow>

        {/* Bugs opened by members */}
        <CCol xs={6}>
          <CCard className={"mb-3"}>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: bugOpenedByMember.map(b => b.name),
                  datasets: [
                    {
                      label: "Top 3 Bugs abertos por membro",
                      backgroundColor: "#90be6d",
                      borderColor: "#90be6d",
                      data: bugOpenedByMember.map(b => b.value)
                    }
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>


        <CCol xs={6}>
          <CCard className={"mb-3"}>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: bugResolvedByMember.map(b => b.name),
                  datasets: [
                    {
                      label: "Top 3 Bugs fechados por membro",
                      backgroundColor: "#3a86ff",
                      borderColor: "#3a86ff",
                      data: bugResolvedByMember.map(b => b.value)
                    }
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Bugs by area */}

      <CRow>
        <CCol xs={4}>
          <CCard>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: bugsByArea.map(b => '.'),
                  datasets: [
                    {
                      label: "Top 5 Bugs por área",
                      backgroundColor: "#fb5607",
                      borderColor: "#fb5607",
                      data: bugsByArea.map(b => b.value),
                    },
                    {
                      label: "Casos de Testes",
                      backgroundColor: "#E6B325",
                      borderColor: "#E6B325",
                      data: testsByArea.map(b => b.data),
                    }
                  ],
                }}
              />
              <CListGroup>
                {
                  bugsByArea.map((data, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      {data.name}
                      <CBadge color="dark" shape="rounded-pill">
                        Bugs: {data.value} | Testes: {testsByArea[index]?.data}
                      </CBadge>
                    </CListGroupItem>
                  ))
                }
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Open bugs by area */}

        <CCol xs={4}>
          <CCard>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: bugOpenedByArea.map(b => '.'),
                  datasets: [
                    {
                      label: "Top 5 Bugs abertos por área",
                      backgroundColor: "#ffbe0b",
                      borderColor: "#ffbe0b",
                      data: bugOpenedByArea.map(b => b.value)
                    },
                    {
                      label: "Casos de Testes",
                      backgroundColor: "#1F4690",
                      borderColor: "#1F4690",
                      data: testsByOpenedArea.map(b => b.data)
                    }
                  ],
                }}
              />
              <CListGroup>
                {
                  bugOpenedByArea.map((data, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      {data.name}
                      <CBadge color="dark" shape="rounded-pill">
                        Bugs: {data.value} | Testes: {testsByOpenedArea[index]?.data}
                      </CBadge>
                    </CListGroupItem>
                  ))
                }
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Closed bugs by area */}

        <CCol xs={4}>
          <CCard>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: bugClosedByArea.map(b => '.'),
                  datasets: [
                    {
                      label: "Top 5 Bugs fechados por área",
                      backgroundColor: "#3a86ff",
                      borderColor: "#3a86ff",
                      data: bugClosedByArea.map(b => b.value)
                    },
                    {
                      label: "Casos de Testes",
                      backgroundColor: "#E8AA42",
                      borderColor: "#E8AA42",
                      data: testsByCloseArea.map(b => b.data)
                    }
                  ],
                }}
              />
              <CListGroup>
                {
                  bugClosedByArea.map((data, index) => (
                    <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                      {data.name}
                      <CBadge color="dark" shape="rounded-pill">
                        Bugs: {data.value} | Testes: {testsByCloseArea[index]?.data}
                      </CBadge>
                    </CListGroupItem>
                  ))
                }
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* </CContainer> */}
    </div >
  )
}


// This function gets called at build time on server-side. It won't be called on client-side, so you can even do direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.You can use any data fetching library
  const data = await axios.get('http://openproject.assert.ifpb.edu.br/api/v3/projects/XX/work_packages?filters=%5B%7B%22type%22%3A%7B%22operator%22%3A%22%3D%22,%22values%22%3A%5B%227%22%5D%7D%7D%5D', { headers: { 'Content-Type': 'application/json', Authorization: 'Basic ' + Buffer.from('apikey:XXX').toString('base64') } })

   // Count bugs
  const { _embedded: { elements: bugs } } = data // when use axios add "result.data"
  console.log(bugs.length)
 
  // Quantity bugs in week
  const bugInWeek = bugs.filter(bug => moment(bug.createdAt).isBetween(moment().day(0).format('DD/MM/YYYY'), moment().day(6).format('DD/MM/YYYY')))

  // Area that has bugs
  const bugsByArea = toArray(_.countBy(bugs.map(bug => bug._links.parent), 'title')).sort((a, b) => b.value - a.value).slice(0, 5)
  const testsByArea = GetSuiteCasesOnTestLink(bugsByArea, 'bugByArea') // get name to used on extract on database

  // Bugs opened by area
  const bugOpenedByArea = toArray(_.countBy(bugs.filter(bug => ['New', 'On hold', 'Reopen'].includes(bug._links.status.title)).map(bug => bug._links.parent), 'title')).filter(f => f.name !== 'null').sort((a, b) => b.value - a.value).slice(0, 5)
  const testsByOpenedArea = GetSuiteCasesOnTestLink(bugOpenedByArea, 'bugOpenedByArea') // get name to used on extract on database

  // Bugs closed by area
  const bugClosedByArea = toArray(_.countBy(bugs.filter(bug => ['Closed'].includes(bug._links.status.title)).map(bug => bug._links.parent), 'title')).sort((a, b) => b.value - a.value).slice(0, 5)
  const testsByCloseArea = GetSuiteCasesOnTestLink(bugClosedByArea, 'bugClosedByArea') // get name to used on extract on database

  // Bugs opened by member
  const bugOpenedByMember = toArray(_.countBy(bugs.map(bug => bug._links.author), 'title')).sort((a, b) => b.value - a.value).slice(0, 3)

  // Bugs resolved by member
  const bugResolvedByMember = toArray(_.countBy(bugs.filter(bug => bug._links.status.title === 'Resolved').map(bug => bug._links.assignee), 'title')).sort((a, b) => b.value - a.value).slice(0, 3)

  // By returning { props: { posts } }, the Blog component will receive `posts` as a prop at build time
  return {
    props: {
      bugs,
      bugInWeek,
      bugsByArea,
      bugOpenedByArea,
      bugClosedByArea,
      bugOpenedByMember,
      bugResolvedByMember,
      testsByArea,
      testsByCloseArea,
      testsByOpenedArea,
      testExecutions: require('../public/executions.testlink.json'),
      project: bugs[0]?._links.project.title || []
    },
  }
}

const toArray = objectData => {
  const values = Object.values(objectData)
  const keys = Object.keys(objectData)
  const array = []

  keys.forEach((key, index) => {
    array.push({
      name: key,
      value: values[index]
    })
  })

  return array
}

const GetSuiteCasesOnTestLink = (bugByArea, file) => {

  // Use this to get names to find on database with file testlink/indexjs the other project
  const namesToFind = bugByArea.map(d => {
    let [, ...last] = d.name.split(" ")
    return last.join(' ')
  })

  console.log({ namesToFind, file })

  return require(`../public/${file}.testlink.json`)
}