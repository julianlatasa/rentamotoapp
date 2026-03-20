import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  container: { 
    flex: 1, 
    padding: 20, 
    marginTop: 30 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  link: { 
    color: 'blue', 
    marginTop: 15, 
    textAlign: 'center' 
  },
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 8, 
    elevation: 2 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 10 
  }
});
