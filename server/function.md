- Connect listazzuk a szobakat ('groups', {groups: [Group]})

- Szoba letrehozasra szoba lista ('enterGroup', { id: string }) -> ('groups', {groups: [Group]})
- Szoba elhagyasa ('leaveGroup', { id: string }) -> ('groups', {groups: [Group]})

- Szavazas inditasa ('startEstimation', {id: string}) -> ('estimations', { estimations: [] })
- Estimation beadasa ('sendEstimation', {group: Group, id: string, estimation: Estimation}) -> ('estimations', { estimations: [Estimation] })
