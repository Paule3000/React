import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from 'graphql';

// Maintain for mutation
let counter = 69;

let data = [
    { counter: 42 },
    { counter: 43 },
    { counter: 44 }
];

let counterType = new GraphQLObjectType({
    name: 'Counter',
    fields: () => ({
        counter: {type: GraphQLInt}
    })
});

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            data: {
                type: GraphQLList(counterType),
                resolve: () => data
            },
            message: {
                type: GraphQLString,
                resolve: () => 'Hello GraphQL'
            }
        })
    }),

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            incrementCounter: {
                type: GraphQLInt,
                resolve: () => ++counter
            }
        })
    })
});

export default schema;
