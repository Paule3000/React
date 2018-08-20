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
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';

// Maintain for mutation
let counter = 69;

// db is already connected
let Schema = (db) => {
    let store = {};

    let storeType = new GraphQLObjectType({
        id: globalIdField("Store"),
        name: 'Store',
        fields: () => ({
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs,
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection("links").find({})
                        .sort({createdAt: -1})
                        .limit(args.first).toArray(),
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
            url: { type: GraphQLString },
            createdAt: {
                type: GraphQLString,
                resolve: (obj) => new Date(obj.createdAt).toISOString
            }
        })
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType
    });

    let createLinkMutation = mutationWithClientMutationId({
        name: 'CreateLink',
        inputFields: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            url: { type: new GraphQLNonNull(GraphQLString) }
        },

        outputFields: {
            linkEdge: {
                type: linkConnection.edgeType,
                resolve: (obj) => ({ node: obj.ops[0], cursor: obj.insertedId })
            },
            store: {
                type: storeType,
                resolve: () => store
            }
        },

        mutateAndGetPayload: ({title, url}) => {
            return db.collection("links").insertOne({
                title, 
                url,
                createdAt: Data.now()
            });
        }
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
                createLink: createLinkMutation
            })
        })

        // mutation: new GraphQLObjectType({
        //     name: 'MutationIncrement',
        //     fields: () => ({
        //         incrementCounter: {
        //             type: GraphQLInt,
        //             resolve: () => ++counter
        //         }
        //     })
        // })
    });

    return schema;
};

export default Schema;
