const role = {
    admin: 'admin',
    user: 'user'
}

module.exports = {
    role : role,
    users: [
        {id: 14, name:'David', role: role.admin},
        {id: 15, name:'Enrique', role: role.user},
        {id: 16, name:'manu', role: role.user}
    ],
    projects: [
        {id: 14, name:'Valora App', userId: 14},
        {id: 15, name:'Valora App', userId: 15},
        {id: 16, name:'Valora App', userId: 16}
    ]
}