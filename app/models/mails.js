exports.contact = (data) => {
    if (data.phone !== '') {
        return (
            `<div>
                <p>Envoyé depuis la page contact</p>
                <p>Name: ${data.name}</p>
                <p3>Entreprise: ${data.entreprise}</p>
                <p>Ville: ${data.city}</p>
                <p>Mail: ${data.sender}</p>
                <p>Téléphone: ${data.phone}</p>
                <div>${data.content}</div>
            </div>`
        )
    } else {
        return (
            `<div>
                <p>Envoyé depuis la page contact</p>
                <p>Name: ${data.name}</p>
                <p3>Entreprise: ${data.entreprise}</p>
                <p>Ville: ${data.city}</p>
                <p>Mail: ${data.sender}</p>
                <div>${data.content}</div>
            </div>`
        )
    }
}

exports.profil = (data) => {
    return (
        `<div>
            <p>Envoyé depuis votre page profil</p>
            <p>Mail: ${data.sender}</p>
            <p>${data.content}</p>
        </div>`
    )
}

exports.passLink = (data) => {
    return (
        `<div>
            <p>Cliquez sur ce lien pour modifier votre mot de passe</p>
            <a target="_blank" href="http://localhost:6868/#!/reset/password/${data.token}"> http://localhost:6868/#!/reset/password/${data.token}</a>
        </div>`
    )
}

exports.confirm = (data) => {
    return(
        `<div>
            <p>Cliquez sur ce lien pour finaliser votre inscription</p>
            <a target="_blank" href="http://localhost:6868/#!/confirm/email/${data.token}"> http://localhost:6868/#!/confirm/email/${data.token}</a>
        </div>`
    )
}
