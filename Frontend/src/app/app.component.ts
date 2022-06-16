import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_QUOTES = gql`
  {
    quotes {
      quotes {
        _id
        quote
        author
      }
    }
  }
`;
const CREATE_QUOTES = gql`
  mutation createQuote($quote: String!, $author: String!) {
    createQuote(quoteInput: { quote: $quote, author: $author }) {
      _id
      quote
      author
    }
  }
`;
const DELETE_QUOTES = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      _id
      quote
      author
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  quotes!: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.quotes = this.apollo
      .watchQuery({
        query: GET_QUOTES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.quotes.quotes);
          return result.data.quotes.quotes;
        })
      );
  }
  create(quote: string, author: string) {
    console.log(quote, author);
    this.apollo.mutate({
      mutation: CREATE_QUOTES,
      refetchQueries: [{ query: GET_QUOTES }],
      variables: {
        quote: quote,
        author: author,
      }
    }).subscribe(()=>{
      console.log("created");
    })
  }
  delete(id: string){
    console.log(id);
    this.apollo.mutate({
      mutation: DELETE_QUOTES,
      refetchQueries: [{query: GET_QUOTES}],
      variables: {
        id: id
      }
    }).subscribe(()=>{
      console.log("deleted");
    })

  }
}
