// For getting suggestions related to cypress commands following can be used
/// <reference types = "cypress"/>      

describe('GET users API tests',()=>{
    let token = "your_token_here";
    let userData = {};

    it('TC 1 : Fetching all user details',()=>{
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users',
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response)=>{
            userData = response.body;
            // Fetching and printing All user details
            for(let i=0;i< response.body.length;i++){
                cy.log(`------Details of user ${i}------`);
                Object.entries(response.body[i]).forEach(([key,value]) => {
                    cy.log(`${key} : ${value}`);
                });
            }
        })
    })

    /*
        it.only ('test_Case_name',()=>{}) will make only the test case mentioned with the
        only parameter execute , rest all cases will not be executed.

        eg ->
            it.only('TC 1 : Fetching all user details',()=>{
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users',
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response)=>{
            userData = response.body;
            // Fetching and printing All user details
            for(let i=0;i< response.body.length;i++){
                cy.log(`------Details of user ${i}------`);
                Object.entries(response.body[i]).forEach(([key,value]) => {
                    cy.log(`${key} : ${value}`);
                });
            }
        })
    })

    */


    it('TC 2 : Fetching user details with a specific ID ',()=>{
        cy.request({
            method : 'GET',
            url : `https://gorest.co.in/public/v2/users/${userData[0].id}`,
            headers : {
                authorization : `Bearer ${token}`
            }
        }).then((response)=>{
            expect(response.body.id).eql(userData[0].id)
            expect(response.body.name).eq(userData[0].name)
            expect(response.body.email).eq(userData[0].email)
            expect(response.body.gender).eq(userData[0].gender)
            expect(response.body.status).eq(userData[0].status)
        })
    })
})
