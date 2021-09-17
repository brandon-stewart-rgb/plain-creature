const { Posts } = require('../models');

const postsData = [

    {
        title: 'Lorem Ipsum Dolor Amet',
        post_text: 'Donec dictum lacinia lectus, sit amet viverra orci blandit ut. Maecenas gravida pretium efficitur. Vivamus consectetur euismod dui, sit amet ultrices lectus dapibus in. Praesent molestie eleifend nisi in pretium. Sed aliquet tellus ac massa consectetur, id semper justo blandit. Morbi ut lacinia dui',
        users_id: 2,
        created_at: new Date()
    },
    {
        title: 'Quisque tempor tincidunt purus',
        post_text: 'Nam ut odio elementum, scelerisque quam sed, iaculis sapien. Etiam nisl lorem, suscipit vitae augue fringilla, auctor suscipit dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam pulvinar, quam nec facilisis viverra, est ante finibus dolor, at facilisis quam massa at augue. Nunc pulvinar congue laoreet. Nam vehicula turpis augue, ut commodo turpis feugiat ac. Fusce laoreet sapien sed euismod ultricies. Integer vel gravida mauris, eu dapibus metus. Donec in ipsum dolo',
        users_id: 1,
        created_at: new Date()
    },
    {
        title: 'Curabitur ultricies turpis at ',
        post_text: 'Curabitur id sodales felis. Praesent dapibus hendrerit dui vel tristique. Maecenas tincidunt diam ac odio efficitur convallis. Etiam volutpat lacus id venenatis semper. Integer eget nisl sem. In consectetur mauris et placerat fermentum. Pellentesque lacinia massa nibh.',
        users_id: 3,
        created_at: new Date()
    },


];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;