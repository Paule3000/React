import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

// Maintain for mutation
let counter = 69;

// db is already connected
let Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection("links").find({}).toArray(),
                    args
                )
            }
        })
    });

    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: GraphQLNonNull(GraphQLID),
                resolve: (obj) => obj._id
            },
            title: { type: GraphQLString },
            url: { type: GraphQLString }
        })
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
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

    return schema;
};

export default Schema;
