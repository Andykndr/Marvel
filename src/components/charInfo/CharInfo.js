import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };
  onError = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    const { char, loading } = this.state;

    const skeleton = char || loading ? null : <Skeleton />;
    const spinner = loading ? <Spiner /> : null;
    const content = !(loading || !char) ? <Viev char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {content}
      </div>
    );
  }
}

const Viev = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr"> {description}</div>
      {description.length > 0 ? null : 'No description of this character'}

      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'No comics with this character'}
        {comics.map((item, i) => {
          if (i > 10) return;

          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
