import { RegisterTest, LoginTest } from '../src/modules/user/tests/Auth.test';
import { MeTest } from '../src/modules/home/tests/Me.test';
import {
    CommentAndLikeTest,
    CreatePostTest,
    DeletePostTest,
    GetPostTest
} from '../src/modules/post/tests/Post.test';
import { Connection } from 'typeorm';
import { testCon } from '../src/utils/testCon';

let con: Connection;

beforeAll(async () => {
    con = await testCon();
});

afterAll(async () => {
    await con.close();
});

describe('Register', RegisterTest);
describe('Login', LoginTest);
describe('Me', MeTest);
describe('Create Post', CreatePostTest);
describe('Comment and Like', CommentAndLikeTest);
describe('Get Post', GetPostTest);
describe('Delete Post', DeletePostTest);
