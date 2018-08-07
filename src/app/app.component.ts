import { Component } from '@angular/core';
import { Itranslation } from './ITranslation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Pig Latin Translation';
  vowels = ['a', 'e', 'i', 'o', 'u'];
  inputValue = '';
  pigLatingHistory: Itranslation[] = [];

  pigLatinTranslate(inputText: string): void {

    if ( !inputText.length ) {
      return;
    }

    inputText = inputText.toLowerCase();

    // Create translatedWords array
    const translatedWords: string[] = [];

    // create array by words in sentence
    const splitEnteredSentence = inputText.split(' ');

    // it finds vowel position for each word to translate it
    for ( const word of splitEnteredSentence ) {
      const vowelPosition = this.findVowelPosition(word);
      translatedWords.push(this.convertToPigLatin(word, vowelPosition));
    }

    // reform the sentence with pig latin words
    const translation = translatedWords.join(' ');
    this.updateHistory(inputText, translation);
    this.inputValue = '';
  }

  findVowelPosition(word: string): number {

    const position = word.split('').findIndex( character => this.vowels.includes(character) );

    // if there are no vowels then return position as 0
    return position === -1 ? 0 : position;

  }

  convertToPigLatin(word: string, position: number): string {
    const initialWord = word.slice(0, position);
    const baseWord = word.slice(position);
    const addSuffix = position > 0 ? 'ay' : 'way';

    return baseWord + initialWord + addSuffix;
  }

  // It maintains upto 10 records history
  updateHistory(beforeTranslation: string, afterTranslation: string): void {

    // max history of 10
    if ( this.pigLatingHistory.length >= 10 ) {
      this.pigLatingHistory.splice(0, 1);
    }

    this.pigLatingHistory.push({ beforeTranslation, afterTranslation });
  }

}

