User.remove({username: 'i5ting for delete'}, (err, doc) => {
    t.false(err);
    t.is(doc.result.ok, 1);
    t.is(doc.result.n, 1);
});