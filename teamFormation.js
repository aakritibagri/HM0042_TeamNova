async function formTeam(newUser, database) {
    const allProfiles = await database.collection('users').find().toArray();

    const team = [newUser]; // Add new user to the team

    const requiredRoles = ['Frontend Developer', 'Backend Developer', 'Designer', 'AI/ML Engineer'];
    const userRole = newUser.role;


    const remainingRoles = requiredRoles.filter(role => role !== userRole);

    remainingRoles.forEach(role => {
        const candidate = allProfiles.find(profile => profile.role === role);
        if (candidate) {
            team.push(candidate);
        }
    });

    return team;
}

// Export function so it can be used in other files
module.exports = { formTeam };
