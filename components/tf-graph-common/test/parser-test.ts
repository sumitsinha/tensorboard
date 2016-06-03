/* Copyright 2015 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

suite('parser', () => {
  let assert = chai.assert;

  test('simple pbtxt', (done) => {
    let pbtxt = `node {
       name: "Q"
       op: "Input"
     }
     node {
       name: "W"
       op: "Input"
     }
     node {
       name: "X"
       op: "MatMul"
       input: "Q"
       input: "W"
     }`;
    tf.graph.parser.parseGraphPbTxt(new Blob([pbtxt])).then(nodes => {
      assert.isTrue(nodes != null && nodes.length === 3);

      assert.equal('Q', nodes[0].name);
      assert.equal('Input', nodes[0].op);

      assert.equal('W', nodes[1].name);
      assert.equal('Input', nodes[1].op);

      assert.equal('X', nodes[2].name);
      assert.equal('MatMul', nodes[2].op);
      assert.equal('Q', nodes[2].input[0]);
      assert.equal('W', nodes[2].input[1]);

      done();
    });
  });

  test('d3 exists', () => { assert.isTrue(d3 != null); });

  // TODO(nsthorat): write tests.

});
