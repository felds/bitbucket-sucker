const fetch = require('node-fetch')

const URL_ROOT = 'https://api.bitbucket.org/2.0'
const ORG = 'felds'


function fetchJson(...xs) {
    return fetch(...xs).then(r => r.json())
}



async function main() {
    const orgInfo = await fetchJson(`${URL_ROOT}/repositories/${ORG}`)

    const slugs = orgInfo.values.map(repo => repo.slug)
    const commits = await Promise.all(slugs.map(
        slug => fetchJson(`${URL_ROOT}/repositories/${ORG}/${slug}/commits`)
    ))

    console.log(commits[0].values[0])
}
main()
