import mysql from 'mysql';
import fs from 'fs'

var connection = mysql.createConnection({
    host: 'XXX',
    user: 'XXX',
    password: 'XXX',
    database: 'testlink'
});


(async (bugArea, nameFile) => {
     let allData = []
     connection.connect();
     const runner = async function (data, acc = []) {
         let result = await new Promise((resolve, reject) => {
             connection.query(`SELECT * from nodes_hierarchy where parent_id in (${data.map(d => d.id)}) `, function (error, results, fields) {
                 if (error) reject(error)
                 if (results.length > 0)
                     resolve(runner(results, [...acc, ...results]))
                     resolve(acc)
            });
                 })
         return result
     }

     for (let bug of bugArea) {
         const initialData = await new Promise((resolve, reject) => {
             connection.query(`SELECT * from nodes_hierarchy where name like "%${bug}%"`, function (error, results, fields) {
                 if (error) reject(error);
                 resolve(results)
             });
         });
         const dataArea = await runner(initialData)
         allData.push({ area: bug, data: dataArea.filter(f => f.node_type_id == 3).length });
     }
     fs.writeFile(`${nameFile}.testlink.json`, JSON.stringify(allData), function (err) {
         if (err) return console.log(err);
         console.log('bugByArea.testlink.json');
     });

     connection.end();
})([
     'Planejamento da Produção',
     'Sistemas Gerais',
     'Gerenciamento de Controle de Acesso',
     'Configuração de Acesso ao Banco de Dados'
], 'bugOpenedByArea')

function getExecutionsTest() {
    const sql = `SELECT t2.id as "plans", e.status, e.execution_duration, us.first
                from testprojects t  
                join testplans t2 on t2.testproject_id = t.id 
                join executions e on e.testplan_id = t2.id 
                JOIN users_sanitized us on us.id = e.tester_id  
                where t.prefix like "%ENERSH%"`;

    connection.query(sql, function (error, results, fields) {
        if (error) console.log(error);

        let reduceData = results.reduce((acc, item, index) => {
            if (!acc['plans'].includes(item.plans))
                acc['plans'].push(item.plans)

            console.log({ index, acc, item })

            if (!acc['status'][item.status.toLowerCase()])
                acc['status'][item.status.toLowerCase()] = 0

            acc['status'][item.status.toLowerCase()] += 1

            acc['executions'] += item.execution_duration || 0
            acc['executions_qtd'] += 1

            return acc

        }, { plans: [], status: [], executions: 0, executions_qtd: 0 })

        const resultData = [
            { display: "Quantidade de planos de testes", value: reduceData.plans.length },
            { display: "Quantidade de execuções que passaram", value: reduceData.status.p },
            { display: "Quantidade de execuções que não passaram", value: reduceData.status.f },
            { display: "Media de tempo de execuxão em minutos", value: (reduceData.executions / reduceData.executions_qtd).toFixed(2) }
        ]

        fs.writeFile(`executions.testlink.json`, JSON.stringify(resultData), function (err) {
            if (err) return console.log(err);
            console.log(`executions.testlink.json`);
        });
    });
}

// --- Selecting Bugs by Sprint
(async (bugArea, nameFile) => {
    let allData = []
    connection.connect();
    const runner = async function (data, acc = []) {
        let result = await new Promise((resolve, reject) => {
            connection.query(`SELECT * from nodes_hierarchy where parent_id in (${data.map(d => d.id)}) `, function (error, results, fields) {
                if (error) reject(error)
                if (results.length > 0)
                    resolve(runner(results, [...acc, ...results]))

                resolve(acc)
            });
        })

        return result
    }

    for (let bug of bugArea) {
        const initialData = await new Promise((resolve, reject) => {
            console.log(`SELECT * from nodes_hierarchy where name like "%${bug}%" and parent_id = 11165`)
            connection.query(`SELECT * from nodes_hierarchy where name like "%${bug}%" and parent_id = 11165`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        });

        const dataArea = await runner(initialData)
        allData.push({ area: bug, data: dataArea.filter(f => f.node_type_id == 3).length });
    }

    fs.writeFile(`${nameFile}.testlink.json`, JSON.stringify(allData), function (err) {
        if (err) return console.log(err);
        console.log(`${nameFile}.testlink.json`);
    });

    // Generating data masses for runs
    getExecutionsTest()

    connection.end();
})([
    'Release 0 - Sprint 2 - v0.2.1',
    'Release 0 - Sprint 3 - v0.3.1',
    'Release 0 - Sprint 5 - v0.5.1 - Desktop',
    'Release 0 - Sprint 5 - v0.5.1 - Mobile',
    'Release 0 - Sprint 7 - v0.7.1 - Desktop - Exploratórios',
    'Release 0 - Sprint 7 - v0.7.1 - Mobile - Exploratórios',
    'Release 0 - Sprint 8 - v0.8.1 - Desktop',
    'Release 0 - Sprint 8 - v0.8.1 - Mobile',
], 'sprints')
