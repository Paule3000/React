import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from 'graphql';

// Maintain for mutation
let counter = 69;

// db is already connected
let Schema = (db) => {
    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            _id: { type: GraphQLString },
            title: { type: GraphQLString },
            url: { type: GraphQLString }
        })
    });

    let schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    // GraphQL and mongodb lib both support promises as standard
                    resolve: () => {
                        let links = db.collection("links");
                        return links.find({}).toArray()
                    }
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
